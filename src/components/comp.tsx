export default function Comp() {

  const buttonHandler = (text: string) => {

      console.log(text);
      const mmm = import.meta.env.PUBLIC_API_URL;
      window.alert(mmm);

  }

  return (
    <div>
      <h1>Hello, Astro!</h1>
      <button onClick={()=>{buttonHandler("hello ")}}>Click me!</button>
    </div>
  );
}