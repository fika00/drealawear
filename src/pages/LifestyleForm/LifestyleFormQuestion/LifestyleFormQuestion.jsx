import InputField from "../../../components/InputField/InputField";
import SecondaryInputField from "../../../components/SecondaryInputField/SecondaryInputField";
import "./LifestyleFormQuestion.scss";
import { motion } from "framer-motion";

const LifestyleFormQuestion = ({
  onChange,
  question,
  placeholder,
  isLast,
  isUnanswered,
  index,
}) => {
  const delay = index * 0.1;

  const onChangeHandler = (e) => {
    onChange(e, index);
  };

  return (
    <motion.div
      initial={{
        scale: 0.99,
        opacity: 0,
        y: 20,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: delay,
      }}
      className="lifestyleformquestion-container"
    >
      <span className="lifestyleformquestion-container-question">
        <span className="lifestyleformquestion-container-question-number playfair">
          {index + 1}.{"        "}
        </span>
        {question}
      </span>
      <SecondaryInputField
        isUnanswered={isUnanswered}
        onChange={onChangeHandler}
        inputData={{ placeholder: placeholder }}
      />
      <motion.hr
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1,
          delay: delay + 0.5,
        }}
        className="lifestyleformquestion-container-divider"
      />
    </motion.div>
  );
};

export default LifestyleFormQuestion;
