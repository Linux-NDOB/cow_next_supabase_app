import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/app/context/loading";

export default function Loading() {
  return (
    <Loader className="animate-spin" />
  )
}
