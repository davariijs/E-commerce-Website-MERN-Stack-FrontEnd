declare module 'aos' {
  const AOS: {
    init: () => void;
    refresh: () => void;
    refreshHard: () => void;
  };
  export default AOS;
}
