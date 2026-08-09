function FeedbackCard({ title, items }) {

    return(

        <div className="feedback-card">

            <h3>{title}</h3>

            <ul>

                {items.map((item,index)=>(

                    <li key={index}>{item}</li>

                ))}

            </ul>

        </div>

    )

}

export default FeedbackCard;