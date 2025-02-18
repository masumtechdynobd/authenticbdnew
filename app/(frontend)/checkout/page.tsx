import Checkout from "@/app/ui/Checkout/Checkout";
import { auth } from "@/auth";
import { API_BASE_URL } from "@/app/config/api";
async function getAddressList(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user/shipping/address/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}
async function getTotalPoint(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user_total_point/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}
export default async function Page() {
    const token: any = await auth();
    let data = null;
    let defaultAddress = null;
    let total_point = 0;
    if (token?.user?.id) {
        const result = await getAddressList(token?.user?.id);
        data = result?.data
        defaultAddress = result?.data.find((item: any) => item.set_default === 1)
        const total_point_get = await getTotalPoint(token?.user?.id);
        total_point = total_point_get?.total_points
    }

    return <Checkout total_point={total_point} data={defaultAddress} addressList={data} />

}
