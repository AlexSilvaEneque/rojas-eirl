import { Toast } from "~/interface"

export const useGlobalUI = defineStore('globalUI', () => {

    const ToastFailed : Toast = reactive({ visible: false })
    const ToastSuccess : Toast = reactive({ visible: false })

    function $reset () {
        ToastFailed.visible = false
        ToastFailed.message = ''
        ToastSuccess.visible = false
        ToastSuccess.message = ''
    }

    const showMsgSuccess = async (msg : string) => {
        ToastSuccess.message = msg
        ToastSuccess.visible = true
    }

    const showMsgFailed = async (msg : string) => {
        ToastFailed.message = msg
        ToastFailed.visible = true
    }

    watchEffect(() => {
        if (ToastSuccess.visible) {
            setTimeout(() => {
                $reset()
            }, 3000);
        }
        if (ToastFailed.visible) {
            setTimeout(() => {
                $reset()
            }, 3000);
        }
    })

    return {
        ToastFailed,
        ToastSuccess,
        showMsgSuccess,
        showMsgFailed,
        $reset
    }
})