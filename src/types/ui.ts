import { DialogProps } from "@/components/common/Dialog";

export type CustomDialogProps = {

} & Pick<DialogProps, 'show' | 'close'>
