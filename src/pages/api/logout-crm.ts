import { AUTH_TOKEN } from "@/common/contants/auth.constant";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

const getMessage = (code) => {
  if (code === 200) {
    return {
      message: {
        vn: "Đăng xuất thành công!",
        en: "Logged out successfully!",
      },
      description: {
        vn: "Đã thành công đăng xuất hệ thống",
        en: "Successfully logged out of the system",
      },
    };
  }

  return {
    message: {
      vn: "Đã có lỗi xảy ra!",
      en: "An error has occurred!",
    },
    description: {
      vn: "Xin lỗi vì sự bất tiện, không thể đăng nhập vào lúc này. Xin vui lòng thử lại sau",
      en: "Sorry for the inconvenience, unable to log in at this time. Something went wrong. Please try again later",
    },
  };
};
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    destroyCookie({ res }, AUTH_TOKEN, {
      path: "/",
    });

    res.status(200).json(getMessage(200));
  } catch (error) {
    res.status(500).json(getMessage(500));
  }
}
