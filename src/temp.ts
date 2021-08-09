// @ts-ignore
type ReponseType = {
  title: string;
  description: string;
};

const print = () => {
  const seed = Math.random() * 10;
  setTimeout(() => {
    console.log(
      new Date().toLocaleTimeString(),
      `FINISHED WITH SEED: ${seed.toFixed(2)}`
    );
  }, seed * 1000);
};

print();

export default print;
