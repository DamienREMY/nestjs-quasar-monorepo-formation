import { useQuasar } from 'quasar'

export function onSubmit(message:string) : void{

  const $quasar = useQuasar()

  $quasar.notify({
    color: 'blue-3',
    textColor: 'black',
    icon: 'cloud_done',
    message: message

  })

}




