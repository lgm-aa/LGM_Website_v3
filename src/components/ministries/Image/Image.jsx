import "./Image.css";

export default function Image({
    image,
    imageAlt = "",
}) {

    return(    
        <section className="image-block">
            <div className="image-block__container">
                {image ? (
                <img
                    className="image-block__img"
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                />
                ) : (
                <div className="image-block__placeholder" />
                )}
            </div>
        </section>
    );


}