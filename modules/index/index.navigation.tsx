// deno-lint-ignore-file no-explicit-any
// import Ads from "@app/modules/index/index.ads.tsx";
import { effect } from "@preact/signals";
import { AppContext } from "@app/modules/index/index.context.ts";
import { useContext, useEffect, useState } from "preact/hooks";
import ArrowDownSvg from "@app/components/icons/arrow-down.tsx";

// import useWebSocket from "@app/modules/hook/socket.ts";

// import { RoomType } from "@app/modules/types/mod.ts";

/*
function Expiration() {
    const toggleDropdown = () => {
        const dropdown = document.getElementById("dropdownMenu");
        if (dropdown) {
            dropdown.classList.toggle("hidden");
        }
    };

    return (
        <div class="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    class="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <span>Expiration</span>
                    <svg
                        class="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06 0L10 10.293l3.71-3.08a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-.92 0l-4.25-3.5a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div
                id="dropdownMenu"
                class="hidden absolute right-0 z-10 mt-2 w-full bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
                <div
                    class="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdownMenuButton"
                >
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id="helper-radio-3"
                                name="helper-radio"
                                type="radio"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </div>
                        <div class="ms-2 text-sm">
                            <label
                                for="helper-radio-3"
                                class="font-medium text-gray-900 dark:text-gray-300"
                            >
                                <div>1 Day</div>
                            </label>
                        </div>
                    </div>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id="helper-radio-4"
                                name="helper-radio"
                                type="radio"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </div>
                        <div class="ms-2 text-sm">
                            <label
                                for="helper-radio-4"
                                class="font-medium text-gray-900 dark:text-gray-300"
                            >
                                <div>1 Week</div>
                            </label>
                        </div>
                    </div>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id="helper-radio-5"
                                name="helper-radio"
                                type="radio"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </div>
                        <div class="ms-2 text-sm">
                            <label
                                for="helper-radio-5"
                                class="font-medium text-gray-900 dark:text-gray-300"
                            >
                                <div>1 Month</div>
                            </label>
                        </div>
                    </div>

                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id="helper-radio-6"
                                name="helper-radio"
                                type="radio"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </div>
                        <div class="ms-2 text-sm">
                            <label
                                for="helper-radio-6"
                                class="font-medium text-gray-900 dark:text-gray-300"
                            >
                                <div>1 Year</div>
                            </label>
                        </div>
                    </div>

                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id="helper-radio-7"
                                name="helper-radio"
                                type="radio"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </div>
                        <div class="ms-2 text-sm">
                            <label
                                for="helper-radio-7"
                                class="font-medium text-gray-900 dark:text-gray-300"
                            >
                                <div>Custom</div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Fieldset() {
    return (
        <>
            <fieldset
                class={`grid grid-cols-2 gap-2 border border-gray-600 rounded-lg p-2 text-sm bg-slate-700`}
            >
                <div class="flex items-center">
                    <input
                        id="country-option-1"
                        type="radio"
                        name="types"
                        value="text"
                        class="text-sm w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        checked
                    />
                    <label
                        for="country-option-1"
                        class="block ms-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                        Message
                    </label>
                </div>
            </fieldset>
        </>
    );
}
*/

function Item(props: { data: any }) {
  const [show, setShow] = useState<any>(false);

  const handleClick = (_v: any) => {
    setShow(!show);
  };

  const handleSendMessage = (_v: any) => {
    // create room
    // add to users chats
    throw new Error("Function not implemented.");
  };

  const handleSeeProfile = (_v: any) => {
    throw new Error("Function not implemented.");
  };

  return (
    <li
      class={`relative flex items-center justify-between gap-x-3`}
    >
      <div
        class={`select-none flex items-center gap-x-3`}
      >
        <img
          src={props.data.avatar_url}
          width={24}
          class={`rounded-full`}
          loading={"lazy"}
        />
        <span class={`text-base`}>
          {props.data.username}
        </span>
      </div>

      <div
        class={`cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          handleClick(props.data);
        }}
      >
        <ArrowDownSvg />
      </div>
      <div
        class={`absolute ${
          show ? "" : "hidden"
        } select-none flex flex-col justify-end text-xs mt-[10rem] w-full z-10 bg-black border-t border-r border-l border-b rounded-md`}
      >
        <div
          class={`border-b p-3 cursor-pointer`}
          onClick={() => handleSeeProfile(props.data)}
        >
          See Profile
        </div>
        <div
          class={`border-b p-3 cursor-pointer`}
          onClick={() => handleSendMessage(props.data)}
        >
          Send Message
        </div>
        <div
          class={`p-3 cursor-pointer`}
          onClick={() => handleSendMessage(props.data)}
        >
          Save Contact
        </div>
      </div>
    </li>
  );
}

export function Navigation() {
  const state = useContext(AppContext);
  const [message, setMessage] = useState<string | null>();
  const [room, setRoom] = useState<string | null>();
  const [data, setData] = useState<any>();

  effect(() => {
    setRoom(state.room.value.id);
    setMessage(state.message.value);
    return () => {
      setMessage(null);
      setRoom(null);
    };
  });

  useEffect(() => {
    if (!message) return;
    const d = [...message];
    const dd = d.filter((v: any) => v.room === room);
    setData(dd);
    return () => {
      setData(null);
    };
  }, [message, room]);

  return (
    <div
      class={`hidden w-2/12 h-screen lg:flex lg:justify-between pe-5 pb-5 pt-5`}
    >
      {data
        ? (
          <ul
            class={`grow overflow-y-auto flex flex-col gap-y-2`}
          >
            {data.map((v: any) => {
              return <Item data={v} />;
            })}
          </ul>
        )
        : <div class={`grow`}></div>}
    </div>
  );
}
