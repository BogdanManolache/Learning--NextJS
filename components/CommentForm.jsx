'use client';

import { createCommentAction } from '@/app/reviews/[slug]/actions';
import { useFormState } from '@/lib/hooks';

export default function CommentForm({ title, slug }) {
  const { state, handleSubmit } = useFormState(createCommentAction);

  return (
    <form
      // action={createCommentAction} // before "use client"
      onSubmit={handleSubmit}
      className="mt-3 flex flex-col gap-2 rounded border bg-white px-3 py-3"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" value={slug} name="slug" />
      <div className="flex">
        <label htmlFor="userField" className="w-32 shrink-0">
          Your name
        </label>
        <input
          id="userField"
          name="user"
          className="w-full rounded border px-2 py-1"
          // required
          // maxLength={50}
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="w-32 shrink-0">
          Your comment
        </label>
        <textarea
          id="messageField"
          name="message"
          className="w-full rounded border px-2 py-1"
          // required
          // maxLength={500}
        />
      </div>
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <button
        type="submit"
        className="w-32 self-center rounded bg-orange-800 px-2
        py-1 text-slate-50 duration-300 hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-500"
        disabled={state.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
