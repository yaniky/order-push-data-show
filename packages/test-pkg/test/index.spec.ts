import SocketMock from "socket.io-mock";
import { assert } from "chai";
import { OrderStore } from "../src/index";

describe("test-pkg", () => {
    // it("should append new item success", function () {
    //     let socket = new SocketMock();

    //     const store = new OrderStore();

    //     store.startBySocketIo = () => {
    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket = socket;

    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket.on("order_event", (data: Array<any>) => {
    //             // eslint-disable-next-line no-extra-parens
    //             (<any>store).handerSocketMessage(data);
    //         });
    //     };

    //     store.startBySocketIo("mock");

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "Carla Garner",
    //             destination: "61109 Alan Motorway, North Corey, CA 92789",
    //             event_name: "CREATED",
    //             id: "1",
    //             item: "Caesar salad",
    //             price: 4692
    //         }
    //     ]);

    //     let data = store.getPage(1);

    //     assert(data.length === 1);

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "2",
    //             destination: "2",
    //             event_name: "CREATED",
    //             id: "2",
    //             item: "2",
    //             price: 4692
    //         }
    //     ]);

    //     data = store.getPage(1);
    //     assert(data.length === 2);
    // });
    // it("should append same id item success", function () {
    //     let socket = new SocketMock();

    //     const store = new OrderStore();

    //     store.startBySocketIo = () => {
    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket = socket;

    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket.on("order_event", (data: Array<any>) => {
    //             // eslint-disable-next-line no-extra-parens
    //             (<any>store).handerSocketMessage(data);
    //         });
    //     };

    //     store.startBySocketIo("mock");

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "Carla Garner",
    //             destination: "61109 Alan Motorway, North Corey, CA 92789",
    //             event_name: "CREATED",
    //             id: "1",
    //             item: "Caesar salad",
    //             price: 4692
    //         }
    //     ]);

    //     let data = store.getPage(1);

    //     assert(data.length === 1);

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "2",
    //             destination: "2",
    //             event_name: "CREATED",
    //             id: "1",
    //             item: "2",
    //             price: 4692
    //         }
    //     ]);

    //     data = store.getPage(1);
    //     assert(data.length === 1);
    //     assert(data[0].item === "2");
    // });
    // it("should get length less than set size", function () {
    //     let socket = new SocketMock();

    //     const store = new OrderStore();

    //     store.startBySocketIo = () => {
    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket = socket;

    //         // eslint-disable-next-line no-extra-parens
    //         (<any>store).socket.on("order_event", (data: Array<any>) => {
    //             // eslint-disable-next-line no-extra-parens
    //             (<any>store).handerSocketMessage(data);
    //         });
    //     };

    //     store.setPageSize(1);

    //     store.startBySocketIo("mock");

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "Carla Garner",
    //             destination: "61109 Alan Motorway, North Corey, CA 92789",
    //             event_name: "CREATED",
    //             id: "1",
    //             item: "Caesar salad",
    //             price: 4692
    //         }
    //     ]);

    //     let data = store.getPage(1);

    //     assert(data.length === 1);

    //     socket.socketClient.emit("order_event", [
    //         {
    //             customer: "2",
    //             destination: "2",
    //             event_name: "CREATED",
    //             id: "2",
    //             item: "2",
    //             price: 4692
    //         }
    //     ]);

    //     data = store.getPage(1);
    //     assert(data.length === 1);


    //     data = store.getPage(2);
    //     assert(data.length === 1);
    // });
    it("should get price page success", function () {
        let socket = new SocketMock();

        const store = new OrderStore();

        store.startBySocketIo = () => {
            // eslint-disable-next-line no-extra-parens
            (<any>store).socket = socket;

            // eslint-disable-next-line no-extra-parens
            (<any>store).socket.on("order_event", (data: Array<any>) => {
                // eslint-disable-next-line no-extra-parens
                (<any>store).handerSocketMessage(data);
            });
        };

        store.setPageSize(2);

        store.startBySocketIo("mock");

        socket.socketClient.emit("order_event", [
            {
                customer: "Carla Garner",
                destination: "61109 Alan Motorway, North Corey, CA 92789",
                event_name: "CREATED",
                id: "1",
                item: "Caesar salad",
                price: 1
            }
        ]);

        socket.socketClient.emit("order_event", [
            {
                customer: "2",
                destination: "2",
                event_name: "CREATED",
                id: "2",
                item: "2",
                price: 2
            }
        ]);

        let data = store.getPageByPrice(1, 1);

        assert(data.length === 1);

        data = store.getPageByPrice(1, 2);

        assert(data.length === 1);

        data = store.getPageByPrice(1, 3);

        assert(data.length === 0);

        socket.socketClient.emit("order_event", [
            {
                customer: "2",
                destination: "2",
                event_name: "CREATED",
                id: "3",
                item: "2",
                price: 1
            }
        ]);

        data = store.getPageByPrice(1, 1);
        assert(data.length === 2);
    });
});