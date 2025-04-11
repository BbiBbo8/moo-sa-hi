import { useToast as useToastOrigin } from "./toast";

//  toast() 훅 래퍼
export const useToast = () => {
  const { toast } = useToastOrigin();
  return { toast };
};
