"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Subscriber({ footer_subscribe }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<any>("");
    const HandlerNewsLatter = async () => {
        if (email == '') {
            toast.error("Please enter email", {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#A020F0', secondary: '#fff' },
            });
            return false
        }
        setLoading(true)
        try {
            const response = await axios.post('/api/subscribers', {
                email: email
            });

            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setEmail("")

            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setEmail("")

            }

            setLoading(false)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscribe flex items-center mt-[20px] w-full md:w-auto justify-center sm:justify-start  ">
            <Input
                type="email"
                placeholder="ex.authentic.gmail.com"
                className="h-[55px] max-w-[220px] text-neutral-black outline-none focus:outline-none rounded-r-[0] border-primary shadow-none focus:shadow-none focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button disabled={loading} className='h-[55px] rounded-l-[0] hover:bg-primary' onClick={HandlerNewsLatter} >{footer_subscribe} {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}</Button>
        </div>
    )
}
