import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const AlertBanner = () => {

    return (
        <Alert variant="destructive" className="mx-20px" >
            <AlertTriangle />
            <AlertTitle>[지진] 서울 강서구 규모 4.0 지진 발생</AlertTitle>
            <AlertDescription>부가 설명</AlertDescription>
        </Alert>
    )
}

export default AlertBanner