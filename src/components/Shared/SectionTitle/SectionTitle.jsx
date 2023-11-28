const SectionTitle = ({title, subtitle, titleColor, borderColor}) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      <h3
        className={`text-2xl text-foreground font-medium ${
          borderColor && `border-${borderColor}`
        } py-4 ${titleColor && `text-${titleColor}`}`}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="text-gray-600 mb-2">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
