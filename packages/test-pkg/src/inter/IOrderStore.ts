export type IOrderStateCreate = "CREATED";
export type IOrderState = IOrderStateCreate;

export interface IOrderItem {
    "id": string; // Order ID, not event ID
    "event_name": IOrderState; // Current order event state
    "price": number; // Price in cents
    "item": string;
    "customer": string;
    "destination": string;
}