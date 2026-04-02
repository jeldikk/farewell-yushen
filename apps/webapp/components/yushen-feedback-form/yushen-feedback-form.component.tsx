"use client";
import { startTransition, useActionState } from "react";
import {
  FormState,
  createYushenFeedbackRecords,
} from "@/actions/yushen-feedback.actions";
import { Schema } from "@/data-schema";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  currentRecords: {
    workingWithOffshore?: Schema["Questionaire"]["type"];
    missingOffshoreTeam?: Schema["Questionaire"]["type"];
    aboutTributeWebsite?: Schema["Questionaire"]["type"];
    mostMemorableMoment?: Schema["Questionaire"]["type"];
    sayToOffshoreBeforeLeaving?: Schema["Questionaire"]["type"];
  };
};

const initialState: FormState = {
  success: false,
  message: "",
  errors: null,
};

export default function YushenFeedbackForm(props: Props) {
  const { currentRecords } = props;
  const [state, formAction, isPending] = useActionState(
    createYushenFeedbackRecords,
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
            Hi Yushen, we would love to hear your feedback about your experience
            handling and working with offshore people. Please share your
            thoughts.
          </legend>
          <textarea
            name="working-with-offshore"
            className="textarea w-[stretch]"
            rows={7}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.workingWithOffshore?.answer || ""}
          ></textarea>
          {state.errors?.workingWithOffshore && (
            <p className="label text-error">
              {state.errors.workingWithOffshore.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            Hi Yushen, We would love to hear how you would miss offshore people.
            Please share your thoughts.
          </legend>
          <textarea
            id="missing-offshore-team"
            name="missing-offshore-team"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.missingOffshoreTeam?.answer || ""}
          ></textarea>
          {state.errors?.missingOffshoreTeam && (
            <p className="label text-error">
              {state.errors.missingOffshoreTeam.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            Hi Yushen, How did you like our farewell website with curated
            AI-generated photos and people's messages? Please share your
            thoughts.
          </legend>
          <textarea
            id="about-tribute-website"
            name="about-tribute-website"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={currentRecords?.aboutTributeWebsite?.answer || ""}
          ></textarea>
          {state.errors?.aboutTributeWebsite && (
            <p className="label text-error">
              {state.errors.aboutTributeWebsite.join(", ")}
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            what are some ofthe most memorable moments you had with offshore
            team or specific offshore team members? Please share your thoughts.
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
            Hi Yushen, Is there anything you want to say to offshore people
            before you leave? Please share your thoughts.
          </legend>
          <textarea
            id="say-to-offshore-before-leaving"
            name="say-to-offshore-before-leaving"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write your message here..."
            defaultValue={
              currentRecords?.sayToOffshoreBeforeLeaving?.answer || ""
            }
          ></textarea>
          {state.errors?.sayToOffshoreBeforeLeaving && (
            <p className="label text-error">
              {state.errors.sayToOffshoreBeforeLeaving.join(", ")}
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
