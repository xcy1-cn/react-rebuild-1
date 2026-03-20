import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import VantImageCode from "@/components/VantImageCode";
import { loginByMessage, getUserBalance, getUserCounts } from "@/api/user";
import { useUserStore } from "@/store/useUserStore";

import "./index.scss";

type ImageCodeRef = {
  validate: (value: string) => boolean;
  refresh: () => void;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const codeRef = useRef<ImageCodeRef | null>(null);
  const timerRef = useRef<number | null>(null);

  const [inputCode, setInputCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [time, setTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const setMobileStore = useUserStore((state) => state.setMobile);
  // const setAssets = useUserStore((state) => state.setAssets);
  // const setCounts = useUserStore((state) => state.setCounts);

  const validateMobile = (value: string) => {
    return /^1[3-9]\d{9}$/.test(value);
  };

  const validateSmsCode = (value: string) => {
    return /^\d{6}$/.test(value);
  };

  const showToast = (message: string) => {
    window.alert(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateMobile(mobile)) {
      showToast("请输入正确的手机号");
      return;
    }

    if (!inputCode.trim()) {
      codeRef.current?.refresh();
      showToast("请输入图形验证码！");
      return;
    }

    const result = codeRef.current?.validate(inputCode);

    if (!result) {
      codeRef.current?.refresh();
      showToast("请输入正确的图形验证码！");
      return;
    }

    if (!validateSmsCode(code)) {
      showToast("请输入正确的短信验证码");
      return;
    }

    try {
      setSubmitting(true);

      const res = await loginByMessage(mobile, code);

      console.log(res);
      
      setMobileStore(mobile);
      setUser(res);
      localStorage.setItem('token', JSON.stringify(res.token))

      // const [balanceRes, countsRes] = await Promise.all([
      //   getUserBalance(res.token),
      //   getUserCounts(res.token),
      // ]);

      // console.log(balanceRes, countsRes);
      
      // setAssets(balanceRes.data?.assets);
      // setCounts(countsRes.data?.counts);

      showToast("登录成功！");
      navigate("/profile");
    } catch (error) {
      console.log("login error:", error);
      showToast("登录失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendCode = async () => {
    if (time > 0) return;

    if (!validateMobile(mobile)) {
      showToast("请先输入正确的手机号");
      return;
    }

    // 这里后续接真实短信验证码接口
    showToast("发送成功");
    setTime(60);
  };

  const handleBack = () => {
    navigate("/my");
  };

  useEffect(() => {
    if (time <= 0) return;

    timerRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [time]);

  return (
    <div className="login-page">
      <div className="login-nav">
        <button className="login-nav__back" onClick={handleBack}>
          ←
        </button>
        <span className="login-nav__title">会员登录</span>
      </div>

      <div className="login-head">
        <h3>手机号登录</h3>
        <h4>未注册的手机号登录后将自动注册</h4>
      </div>

      <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="login-form__item">
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="请输入手机号"
            type="tel"
          />
        </div>

        <div className="login-form__item login-form__item--with-btn">
          <input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="请输入图形验证码"
            type="text"
          />
          <div className="code-btn">
            <VantImageCode ref={codeRef} />
          </div>
        </div>

        <div className="login-form__item login-form__item--with-btn">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="请输入短信验证码"
            type="text"
          />
          <span
            className={`btn-send ${time > 0 ? "active" : ""}`}
            onClick={handleSendCode}
          >
            {time > 0 ? `${time}s后再次发送` : "发送验证码"}
          </span>
        </div>

        <div className="btn">
          <button className="login-submit" type="submit" disabled={submitting}>
            {submitting ? "登录中..." : "登 录"}
          </button>
        </div>
      </form>
    </div>
  );
}
