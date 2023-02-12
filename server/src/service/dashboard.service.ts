import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  endOfYear
} from 'date-fns';
import { AppDataSource } from '../data-source';
import { Product, TABLE_product } from '../entity/Product';
import { TABLE_sales } from '../entity/Sales';
import { TABLE_user } from '../entity/User';

function caculateProductTotal(
  price: number,
  qty: number,
  discount: number,
): number {
  if (!discount) {
    return price * qty;
  }
  const discountPercentage = discount / 100;
  return price * qty - discountPercentage * price;
}

function rangeQuery(startDate: number, endDate: number): string {
  const query = `
  SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
         product."name" "productName", product.supplier , product.category,
         CONCAT("firstName", ' ', "lastName") name
  FROM "${TABLE_sales}" sales
  inner join "${TABLE_product}" product on sales."productId" = product."id"
  inner join "${TABLE_user}" u on sales."createdBy"  = u.id 
  where sales."createdDate" > ${startDate} and sales."createdDate" < ${endDate}
  order by sales.id desc
`;
  return query;
}

function toUnix(date: Date): number {
  return +date;
}
export class DashboardService {
  static async salesToday(): Promise<number> {
    const query = rangeQuery(toUnix(startOfToday()), toUnix(endOfToday()));
    const sales = (await AppDataSource.query(query)) as any[];
    return (
      sales?.reduce((cur, prev) => {
        return (
          cur + caculateProductTotal(prev.price, prev.quantity, prev.discount)
        );
      }, 0) ?? 0
    );
  }
  static async salesThisWeek(): Promise<number> {
    const query = rangeQuery(
      toUnix(startOfWeek(new Date())),
      toUnix(endOfWeek(new Date())),
    );
    const sales = (await AppDataSource.query(query)) as any[];
    return (
      sales?.reduce((cur, prev) => {
        return (
          cur + caculateProductTotal(prev.price, prev.quantity, prev.discount)
        );
      }, 0) ?? 0
    );
  }
  static async salesThisMonth(): Promise<number> {
    const query = rangeQuery(
      toUnix(startOfMonth(new Date())),
      toUnix(endOfMonth(new Date())),
    );
    const sales = (await AppDataSource.query(query)) as any[];
    return (
      sales?.reduce((cur, prev) => {
        return (
          cur + caculateProductTotal(prev.price, prev.quantity, prev.discount)
        );
      }, 0) ?? 0
    );
  }
  static async salesThisYear(): Promise<number> {
    const query = rangeQuery(
      toUnix(startOfYear(new Date())),
      toUnix(endOfYear(new Date())),
    );
    const sales = (await AppDataSource.query(query)) as any[];
    return (
      sales?.reduce((cur, prev) => {
        return (
          cur + caculateProductTotal(prev.price, prev.quantity, prev.discount)
        );
      }, 0) ?? 0
    );
  }
  static async salesLastMonth(): Promise<number> {
    const today = new Date();
    const dateLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );
    const query = rangeQuery(
      toUnix(startOfMonth(dateLastMonth)),
      toUnix(endOfMonth(dateLastMonth)),
    );
    const sales = (await AppDataSource.query(query)) as any[];
    const result =
      sales?.reduce((cur, prev) => {
        return (
          cur + caculateProductTotal(prev.price, prev.quantity, prev.discount)
        );
      }, 0) ?? 0;
    return result;
  }
  static async lowStockProduct(): Promise<number> {
    const repo = AppDataSource.getRepository(Product);
    const products = await repo.find();
    return products.filter((product) => {
      return product.stock < product.reorderPoint;
    }).length;
  }
  static async expiredProduct(): Promise<number> {
    const today = Date.now();
    const repo = AppDataSource.getRepository(Product);
    const products = await repo.find();
    return products.filter((product) => {
      return +product.expiration < today;
    }).length;
  }
}
