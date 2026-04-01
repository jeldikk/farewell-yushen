"use client";
import { startTransition, useActionState } from "react";
import {
  FormState,
  createWhatWeFeelRecords,
} from "@/actions/what-we-feel.actions";
import { Schema } from "@/data-schema";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  currentRecords: {
    firstImpression?: Schema["Questionaire"]["type"];
    mostMemorableMoment?: Schema["Questionaire"]["type"];
    feelingOnLeavingNews?: Schema["Questionaire"]["type"];
    bestCompliment?: Schema["Questionaire"]["type"];
    whatWouldYouMiss?: Schema["Questionaire"]["type"];
    messageToYushen?: Schema["Questionaire"]["type"];
  };
};

const initialState: FormState = {
  success: false,
  message: "",
  errors: null,
};

export default function CreateFeelingsForm(props: Props) {
  const { currentRecords } = props;
  const [state, formAction, isPending] = useActionState(
    createWhatWeFeelRecords,
    initialState,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <div className="create-feelings-form">
      {state.errors && (
        <div className="alert alert-error alert-outline m-4">
          <div>
            <ExclamationCircleIcon className="inline w-5 h-5 mr-2" />
            {state.message}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="create-feelings-form p-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            what was your first instance of talking to Yushen ?
          </legend>
          <textarea
            name="first-impression"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.firstImpression?.answer || ""}
          ></textarea>
          {state.errors?.firstImpression && (
            <p className="label text-error">
              {state.errors.firstImpression.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What is the most memorable moment you have shared with Yushen ?
          </legend>
          <textarea
            id="most-memorable-moment"
            name="most-memorable-moment"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.mostMemorableMoment?.answer || ""}
          ></textarea>
          {state.errors?.mostMemorableMoment && (
            <p className="label text-error">
              {state.errors.mostMemorableMoment.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What was your feeling when you heard the news of Yushen leaving ?
          </legend>
          <textarea
            id="feeling-on-leaving-news"
            name="feeling-on-leaving-news"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.feelingOnLeavingNews?.answer || ""}
          ></textarea>
          {state.errors?.feelingOnLeavingNews && (
            <p className="label text-error">
              {state.errors.feelingOnLeavingNews.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What is the best compliment you have received from Yushen ?
          </legend>
          <textarea
            id="best-compliment"
            name="best-compliment"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.bestCompliment?.answer || ""}
          ></textarea>
          {state.errors?.bestCompliment && (
            <p className="label text-error">
              {state.errors.bestCompliment.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What would you miss the most when Yushen leaves ?
          </legend>
          <textarea
            id="what-would-you-miss"
            name="what-would-you-miss"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.whatWouldYouMiss?.answer || ""}
          ></textarea>
          {state.errors?.whatWouldYouMiss && (
            <p className="label text-error">
              {state.errors.whatWouldYouMiss.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What is the message you want to send to Yushen before she leaves ?
          </legend>
          <textarea
            id="message-to-yushen"
            name="message-to-yushen"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.messageToYushen?.answer || ""}
          ></textarea>
          {state.errors?.messageToYushen && (
            <p className="label text-error">
              {state.errors.messageToYushen.join(", ")}
            </p>
          )}
        </fieldset>
        <div className="button-controls flex flex-col gap-2 my-4">
          <button type="submit" className="btn btn-primary">
            {isPending && <span className="loading loading-spinner"></span>}
            Save Answers
          </button>
          <button type="reset" className="btn btn-secondary">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
