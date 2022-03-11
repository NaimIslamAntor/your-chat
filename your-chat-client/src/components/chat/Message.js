

const Message = ({ name, message,  me=false }) => {
  return (
    <div className={`${me ? 'align-self-end' : 'align=self-start'} my-2`}>
        <h5 className={`${me ? 'text-end': 'text-start'}`}>{name}</h5>
       <div className={`${me ? 'bg-primary': 'bg-secondary'}`} style={{width: "200px"}}>
       <p className={`text-white`}>{message}</p>
       </div>
    </div>
  )
}

export default Message