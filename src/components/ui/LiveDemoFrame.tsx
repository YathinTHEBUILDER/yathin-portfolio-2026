type LiveDemoFrameProps = {
  title: string;
  url: string;
};

export default function LiveDemoFrame({ title, url }: LiveDemoFrameProps) {
  return (
    <div>
      <p>{title}</p>
      <a href={url} target="_blank" rel="noreferrer">
        Open Live Site
      </a>
    </div>
  );
}
