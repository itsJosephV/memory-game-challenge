import {SVGProps} from "react";

export function NoLifeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.025 20.35q-.35 0-.687-.125t-.613-.375Q8 17.45 6.3 15.812t-2.662-2.874t-1.3-2.263T2 8.5q0-2.3 1.6-3.9T7.5 3q1.65 0 2.9.637t.9 1.838l-.925 3.25q-.125.5.163.888t.787.387H13l-.65 6.35q-.025.2.163.225t.237-.15L14.6 10.3q.15-.5-.15-.9t-.8-.4H12l1.525-4.525Q13.8 3.6 14.675 3.3T16.5 3q2.3 0 3.9 1.6T22 8.5q0 1.1-.4 2.175t-1.388 2.375t-2.65 2.938t-4.212 3.862q-.275.25-.625.375t-.7.125"
        fill="currentColor"
      />
    </svg>
  );
}
