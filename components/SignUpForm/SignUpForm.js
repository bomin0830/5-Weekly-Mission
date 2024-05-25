import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { InputBox } from "../InputBox";
import { checkDuplicateEmail, regexData } from "../../utils";

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
    pattern: {
      value: regexData.pwd,
      message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
    },
  },
};

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = () => {
    location.href = "folder";
  };

  return (
    <form className={cx("form-wrapper")} onSubmit={handleSubmit(onSubmit)}>
      <InputBox
        label="이메일"
        name="email"
        placeholder="이메일을 입력해 주세요"
        errors={errors}
        valid={ValidData.email}
        register={register}
        validate={(value) => checkDuplicateEmail(value) || "이메일 중복됨"}
      />
      <InputBox
        label="비밀번호"
        name="password"
        placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
        valid={ValidData.pwd}
        errors={errors}
        register={register}
      />
      <InputBox
        label="비밀번호 확인"
        name="passwordCheck"
        placeholder="비밀번호와 일치하는 값을 입력해주세요"
        errors={errors}
        register={register}
        validate={(value) =>
          value === password || "비밀번호가 일치하지 않습니다."
        }
      />
      <button type="submit" className={cx("submit-button")}>
        회원가입
      </button>
    </form>
  );
}
