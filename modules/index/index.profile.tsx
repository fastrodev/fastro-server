export function Setting(props: { avatar_url: string; username: string }) {
    return (
        <div class={`flex justify-between gap-2 items-center`}>
            <div class={`inline-flex gap-2 items-center`}>
                <img
                    loading={"lazy"}
                    src={props.avatar_url}
                    width={24}
                    class={`rounded-full`}
                />

                <span>{props.username}</span>
            </div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-settings-2"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
        </div>
    );
}
