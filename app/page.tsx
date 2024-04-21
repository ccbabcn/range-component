import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Range Component',
  description: 'Next.js Range Component',
  keywords: 'range component, next.js, typescript',
  authors: [
    { name: 'Cristian Bermudez Agudelo', url: 'https://github.com/ccbabcn' },
  ],
  creator: 'Cristian Bermudez Agudelo',
  icons: '/favicon.ico',
};
export default function Page() {
  return (
    <div className="flex flex-col gap-y-5 text-slate-800">
      <h1 className="text-3xl font-bold">Custom Range Component</h1>
      <p>
        This project contains a custom range component with two usage modes.
      </p>
      <p>
        <span className="font-bold text-slate-700">Exercise 1</span> allows
        users to set new values by dragging the handles or typing on the minimum
        and maximum input labels. The values are constrained within the
        specified minimum and maximum values and the user can select any ammount
        in the range. Hovering over handles enlarges them and changes the cursor
        type. Dragging a handle changes the cursor to indicate dragging. The
        minimum and maximum values cannot be crossed. The component uses a
        mocked HTTP service to provide the minimum and maximum values.
      </p>
      <p>
        <span className="font-bold text-slate-700">Exercise 2</span> allows
        users to set new values only by dragging the handles. The values are
        constrained within the specified minimum and maximum values but only the
        given values can be selected. Hovering over handles enlarges them and
        changes the cursor type. Dragging a handle changes the cursor to
        indicate dragging. The minimum and maximum values cannot be crossed. The
        component uses a mocked HTTP service to provide the minimum and maximum
        values.
      </p>
    </div>
  );
}
