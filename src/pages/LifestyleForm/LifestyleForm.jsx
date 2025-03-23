import { useEffect, useState } from "react";
import ThirdMenuButton from "../../components/ThirdMenuButton/ThirdMenuButton";
import "./LifestyleForm.scss";
import LifestyleFormQuestion from "./LifestyleFormQuestion/LifestyleFormQuestion";
import { questions } from "./questions";
import { useMutation } from "@tanstack/react-query";
import { api, version } from "../../components/utils/api";
import { useToast } from "../../components/utils/ToastContext";
import { useNavigate } from "react-router-dom";

const LifestyleForm = () => {
  const [form, setForm] = useState({});
  const [unansweredIndexes, setUnAnsweredIndexes] = useState([]);

  const { addToast } = useToast();

  const navigate = useNavigate();

  const { mutate: postForm } = useMutation({
    // Remove 'useMutation:' and directly provide the mutation function
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Lifestyle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      // return response.json();
    },
    onSuccess: (data) => {
      addToast("Success.", "success");

      const timeout = setTimeout(() => {
        navigate("/");
        clearTimeout(timeout);
      }, 750);
    },
    onError: (error) => {
      addToast("Failed.", "error");
    },
  });

  useEffect(() => {
    const formattedArray = questions.map((question) => {
      return { question: question.question, answer: "" };
    });
    setForm(formattedArray);
  }, []);

  const handleOnChange = (text, index) => {
    setForm((prev) => {
      let temp = prev;

      temp[index].answer = text;

      return temp;
    });
    setUnAnsweredIndexes([]);
  };

  const handleSubmit = () => {
    const unansweredIndexes = form.reduce((acc, question, i) => {
      if (question.answer === "") acc.push(i);
      return acc;
    }, []);
    setUnAnsweredIndexes(unansweredIndexes);

    if (unansweredIndexes.length === 0) {
      postForm();
    } else {
    }
  };

  return (
    <div className="lifestyleform-container">
      <div className="lifestyleform-container-inner">
        {questions.map(({ question, placeholder }, i) => (
          <LifestyleFormQuestion
            index={i}
            key={i}
            question={question}
            placeholder={placeholder}
            isUnanswered={unansweredIndexes.includes(i)}
            onChange={handleOnChange}
          />
        ))}
        <ThirdMenuButton
          onClick={handleSubmit}
          color={"#d7d7d7"}
          isLightSkin
          text={"Submit"}
        />
        <div></div>
      </div>
    </div>
  );
};

export default LifestyleForm;
