import Link from "next/link";
import { FormFields } from "@/app/types/auth";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Props {
  title: string;
  fields: FormFields[];
  submitText: string;
  action: string;
  actionUrl: string;
  onSubmit: (data: FormData) => void;
  errorMessage: string;
}
function AuthForm({
  title,
  fields,
  submitText,
  action,
  actionUrl,
  onSubmit,
  errorMessage,
}: Props) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Button variant="link">
            <Link href={actionUrl}>{action}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      {errorMessage && (
        <p className="text-red-500 p-4 border border-red-500">{errorMessage}</p>
      )}
      <CardContent>
        <form
          action={onSubmit}
          className="flex flex-col gap-4 mt-6"
          id="login-form"
        >
          {fields.map(({ label, name, type, placeholder }) => (
            <Field key={name}>
              <Label>{label}</Label>
              <Input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" form="login-form">
          {submitText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AuthForm;
