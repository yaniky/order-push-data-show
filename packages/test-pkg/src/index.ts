import { io, Socket } from "socket.io-client";
import { IOrderItem } from "./inter/IOrderStore";

export class OrderStore {
    private orderMap: {
        [key: string]: IOrderItem
    } = {};

    private orderList: Array<IOrderItem> = [];

    private orderPriceMap: {
        [key: number]: Array<IOrderItem>
    } = {};

    private socket: Socket | null = null;

    private pageSize = 6;

    public startBySocketIo(linkUrl: string) {
        this.socket = io(linkUrl);

        this.socket.on("order_event", (data: Array<IOrderItem>) => {
            this.handerSocketMessage(data);
        });
    }

    public close() {
        this.socket?.close();
    }

    public setPageSize(size: number): void {
        this.pageSize = size;
    }

    public getPage(page: number): Array<IOrderItem> {
        const offset = this.pageSize * (page - 1);

        if (offset >= this.orderList.length) {
            return [];
        }

        const res = [];

        for (let i = 0; i < this.pageSize; i++) {
            if (i + offset < this.orderList.length) {
                res.push(this.orderList[i + offset]);
            } else {
                break;
            }
        }

        return res;
    }

    public getPageByPrice(page: number, price: number): Array<IOrderItem> {
        if (typeof price !== "number") {
            return this.getPage(page);
        }

        const list = this.orderPriceMap[price];

        if (!list) {
            return [];
        }

        const offset = this.pageSize * (page - 1);

        if (offset >= list.length) {
            return [];
        }

        const res = [];

        for (let i = 0; i < this.pageSize; i++) {
            if (i + offset < list.length) {
                res.push(list[i + offset]);
            } else {
                break;
            }
        }

        return res;
    }

    public getTotalOrderNum(): number {
        return this.orderList.length;
    }

    public getPriceOrderNum(price: number): number {
        const list = this.orderPriceMap[price];

        if (!list) {
            return 0;
        }
        return list.length;
    }

    private handerSocketMessage(e: Array<IOrderItem>) {
        if (e instanceof Array) {
            for (const item of e) {
                this.appendItem(item);
            }
        }
    }

    private appendItem(data: IOrderItem): void {
        if (this.orderMap[data.id]) {
            // exist and update
            this.orderMap[data.id].destination = data.destination;
            this.orderMap[data.id].event_name = data.event_name;
            this.orderMap[data.id].item = data.item;
            this.orderMap[data.id].price = data.price;
        } else {
            // save heap data
            this.orderMap[data.id] = data;
            this.orderList.unshift(data);
            // price index
            if (this.orderPriceMap[data.price]) {
                this.orderPriceMap[data.price].unshift(data);
            } else {
                this.orderPriceMap[data.price] = [data];
            }
        }
    }
}