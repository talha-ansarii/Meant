shades.map((shade, index) => (
  <span
    key={index}
    className="w-[13px] h-[13px] inline-block"
    style={{ backgroundColor: shade }}
  ></span>
))

export default productShades;
