import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Management | About",
};
const About = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xl w-full mx-3">
        <h1 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center pt-20">
          Md. Minhazul Islam Khan
        </h1>
        <h2 className="text-center text-lg font-bold text-primary">
          Fullstack developer
        </h2>
        <div className="grid grid-cols-4 gap-4 w-full md:w-1/2 my-20 mx-auto">
          <div className="text-primary font-bold">Email:</div>
          <a
            href="mailto:minhazulislamkhan@gmail.com"
            target="_blank"
            className="col-span-3 text-primary font-semibold ml-3"
          >
            minhazulislamkhan@
            <span className="sm:inline inline-block">gmail.com</span>
          </a>
          <div className="text-primary font-bold">Contact:</div>
          <a
            href="tel:+8801521438469"
            target="_blank"
            className="col-span-3 text-primary font-semibold ml-3"
          >
            +8801521438469
          </a>
          <div className="text-primary font-bold">Skills:</div>
          <div className="col-span-3 text-primary font-semibold ml-3">
            <ul className="list-disc">
              <li>JavaScript | ES6</li>
              <li>TypeScript</li>
              <li>Node.Js | Express.js</li>
              <li>Mongodb | Mongoose</li>
              <li>PostgreSQL</li>
              <li>Prisma</li>
              <li>React.Js</li>
              <li>Next.Js</li>
              <li>Redux | Redux Toolkit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
