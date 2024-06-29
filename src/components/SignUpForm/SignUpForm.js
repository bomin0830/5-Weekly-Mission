import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { InputBox } from "../InputBox";
import { checkDuplicateEmail, postSignUp, regexData } from "../../utils";

const cx = classNames.bind(styles);

const ValidData = {
  email: {
    required: { value: true, message: "이메일을 입력해 주세요" },
    pattern: {
      value: regexData.email,
      message: "올바른 이메일 주소가 아닙니다.",
    },
    validate: async (value) =>
      (await checkDuplicateEmail(value)) || "이메일 중복됨",
  },
  pwd: {
    required: { value: true, message: "비밀번호를 입력해 주세요" },
    pattern: {
      value: regexData.pwd,
      message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
    },
  },
  pwdCheck: {
    validate: (value, formValues) =>
      value === formValues.password || "비밀번호가 일치하지 않습니다.",
  },
};

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    const selectedData = { email, password };
    console.log(selectedData);
    postSignUp(selectedData);
  };

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
        placeholder='영문, 숫자를 조합해 8자 이상 입력해 주세요.'
        errors={errors}
        register={{ ...register("password", ValidData.pwd) }}
      />
      <InputBox
        label='비밀번호 확인'
        name='passwordCheck'
        placeholder='비밀번호와 일치하는 값을 입력해주세요'
        errors={errors}
        register={{ ...register("passwordCheck", ValidData.pwdCheck) }}
      />
      <button type='submit' className={cx("submit-button")}>
        회원가입
      </button>
    </form>
  );
}
