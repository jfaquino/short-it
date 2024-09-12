export default function GooBackground() {
   return (
      <div
         style={{ filter: "url(#goo) blur(40px)" }}
         className="w-full h-full "
      >
         <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
            <defs>
               <filter id="goo">
                  <feGaussianBlur
                     in="SourceGraphic"
                     stdDeviation="10"
                     result="blur"
                  />
                  <feColorMatrix
                     in="blur"
                     mode="matrix"
                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                     result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
               </filter>
            </defs>
         </svg>
         <div
            style={{ "--goo-color": "168, 85, 247" }}
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(var(--goo-color),_0.4)_0%,_rgba(var(--goo-color),_0)_50%)] bg-no-repeat
                  w-[var(--circle-size)] h-[var(--circle-size)] top-[calc(50%_-_var(--circle-size)_/2)] left-[calc(50%_-_var(--circle-size)_/2)] 
                  origin-center animate-move-vertical mix-blend-hard-light opacity-100"
         />
         <div
            style={{ "--goo-color": "168, 28, 247" }}
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(var(--goo-color),_0.4)_0%,_rgba(var(--goo-color),_0)_50%)] bg-no-repeat
                  w-[var(--circle-size)] h-[var(--circle-size)] top-[calc(50%_-_var(--circle-size)_/2)] left-[calc(50%_-_var(--circle-size)_/2)] 
                  origin-[calc(50%_-_400px)] animate-move-in-circle mix-blend-hard-light opacity-100 delay-1000"
         />
         <div
            style={{ "--goo-color": "126, 34, 206" }}
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(var(--goo-color),_0.4)_0%,_rgba(var(--goo-color),_0)_50%)] bg-no-repeat
                  w-[var(--circle-size)] h-[var(--circle-size)] top-[calc(50%_-_var(--circle-size)_/2)] left-[calc(50%_-_var(--circle-size)_/2)] 
                  origin-[calc(50%_-_400px)] animate-move-in-circle-long mix-blend-hard-light opacity-100"
         />
         <div
            style={{ "--goo-color": "168, 85, 247" }}
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(var(--goo-color),_0.4)_0%,_rgba(var(--goo-color),_0)_50%)] bg-no-repeat
                  w-[var(--circle-size)] h-[var(--circle-size)] top-[calc(50%_-_var(--circle-size)_/2)] left-[calc(50%_-_var(--circle-size)_/2)] 
                  origin-[calc(50%_-_200px)] animate-move-horizontal mix-blend-hard-light opacity-100"
         />
         <div
            style={{ "--goo-color": "168, 85, 247" }}
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(var(--goo-color),_0.4)_0%,_rgba(var(--goo-color),_0)_50%)] bg-no-repeat
                  w-[var(--circle-size)] h-[var(--circle-size)] top-[calc(50%_-_var(--circle-size)_/2)] left-[calc(50%_-_var(--circle-size)_/2)] 
                  origin-[calc(50%_-_800px)] animate-move-in-circle mix-blend-hard-light opacity-100"
         />
      </div>
   );
}
