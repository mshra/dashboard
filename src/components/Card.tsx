function Card({ props }: { props: { heading: string; content: number } }) {
  return (
    <div className="border-2 border-[#eeeef0] rounded-md p-4 w-72 h-24">
      <h2 className="font-bold">{props.heading}</h2>
      <p>{props.content}</p>
    </div>
  );
}

export default Card;
