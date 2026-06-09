// app/placement-test/[id]/page.jsx

import { Suspense } from "react";
import PlacementTestContent from "./PlacementTestContent";
import { LoadingView } from "./_components";

export default function PlacementTestPage() {
  return (
    <Suspense fallback={<LoadingView />}>
      <PlacementTestContent />
    </Suspense>
  );
}
