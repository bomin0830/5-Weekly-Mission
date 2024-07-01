import styles from "./SingInForm.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { InputBox } from "../InputBox";
import { regexData, postSignin } from "../../utils";
import { useMutation } from "@tanstack/react-query";

const cx = classNames.bind(styles);

const ValidData = {
  email: {
    required: { value: true, message: "이메일을 입력해 주세요" },
    pattern: {
      value: regexData.email,
      message: "올바른 이메일 주소가 아닙니다.",
    },
  },
  pwd: {
    required: { value: true, message: "비밀번호를 입력해 주세요" },
  },
};

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    postSigninMutaion.mutate(data, setError);
  };

  const postSigninMutaion = useMutation({
    mutationFn: (data) => postSignin(data, setError),
  });

  return (
    <form className={cx("form-wrapper")} onSubmit={handleSubmit(onSubmit)}>
      <InputBox
        label='이메일'
        name='email'
        placeholder='이메일을 입력해 주세요'
        errors={errors}
        register={{ ...register("email", ValidData.email) }}
      />
      <InputBox
        label='비밀번호'
        name='password'
        placeholder='비밀번호를 입력해 주세요'
        errors={errors}
        register={{ ...register("password", ValidData.pwd) }}
      />
      <button type='submit' className={cx("submit-button")}>
        로그인
      </button>
    </form>
  );
}
