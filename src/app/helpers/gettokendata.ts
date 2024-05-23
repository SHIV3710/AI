import jwt from 'jsonwebtoken';

export const gettokendata = async (token:any) => {
    try {
        const secret = process.env.NEXT_PUBLIC_SECRET_KEY;
        var decoded = await jwt.verify(token, secret!);
        return decoded;

        
    } catch (error: any) {
        throw new Error(error)
    }
}