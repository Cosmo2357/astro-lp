export default function Comp() {

  const buttonHandler = (text: string) => {

      console.log(text);
      const mmm = import.meta.env.PUBLIC_API_URL;
      window.alert(mmm);

  }

  return (
    <div className=" self-start flex justify-center items-center w-52 h-24 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-500 cursor-pointer">
      <button onClick={()=>{buttonHandler("hello ")}}>Show ENV Value from server !</button>
    </div>
  );
}