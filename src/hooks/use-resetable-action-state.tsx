import { useActionState, startTransition } from "react";

export function useResetableActionState<State, Payload>(
   action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
   initialState: Awaited<State>,
   permalink?: string
): [
   state: Awaited<State>,
   dispatch: (payload: Payload | null) => void,
   isPending: boolean,
   reset: () => void
] {
   const [state, submit, isPending] = useActionState(
      async (state: Awaited<State>, payload: Payload | null) => {
         if (!payload) {
            return initialState;
         }
         return await action(state, payload);
      },
      initialState,
      permalink
   );

   const dispatch = (payload: Payload | null) => {
      startTransition(() => {
         submit(payload);
      });
   };

   const reset = () => {
      dispatch(null);
   };

   return [state, dispatch, isPending, reset];
}
