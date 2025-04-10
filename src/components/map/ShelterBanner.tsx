import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ShelterBanner = () => {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};

export default ShelterBanner;
