import { PRIVATE_ROUTE } from "@/common/routers";
import useAuth from "@/hooks/auth/useAuth";
import { Button, Result } from "antd";
import Link from "next/link";
import { parseCookies } from "nookies";
import React from "react";

const NotExistPage = () => {
  const { logout } = useAuth();
  const session = parseCookies().session;
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <>
          <Link href={PRIVATE_ROUTE.HOME}>
            <Button type="primary">Quay về trang chủ</Button>
          </Link>
          {session && (
            <Button danger type="primary" onClick={() => logout.mutate()}>
              Đăng xuất
            </Button>
          )}
        </>
      }
    />
  );
};

export default NotExistPage;
