
import { NextResponse } from "next/server";

export async function GET(request: Request) {


    // Controller呼び出しなど行う
    // DB接続もライブラリインストール（drizzle, prisma

    // フロントエンド（コンポーネントの勉強
    // 標準搭載されているフック（コンポーネントとはべつもの）
    // コンポーネント内で使用する特殊な関数
    // useForm(ReactHookForm) 問い合わせフォームとか
    // useState(より便利にしたもの：useReducer)
    // useEffect
    // useRef
    // クライアントサイドコンポーネントで使用（フックはブラウザ内で使用する関数
    // storeという概念<-勉強（実現するためのライブラリ zustaund
    // components配下のディレクトリ構成も流派ある

    // google keepのやつ勉強

    const year = new Date().getFullYear();

    return NextResponse.json({success:year});
}