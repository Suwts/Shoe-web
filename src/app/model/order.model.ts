export class OrderDTO{
    full_name : string;
    address : string;
    phone_number : string;
    note : string;
    payment : string;
    shipping_method : string;
    total_money : number;
    cart_item :{product_id: number, quantity : number} []
}