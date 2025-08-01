export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-semibold">
    <div className="mr-2 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
      <span className="text-lg font-bold text-white">∞</span>
    </div>
    {!props.isTextHidden && (
      <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        ZENO
      </span>
    )}
  </div>
);
