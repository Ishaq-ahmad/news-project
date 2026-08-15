

const pagination= (req)=>{
    const page= req.query.page || 1;
    const limit= req.query.limit || 10;
    const skip= (page-1)*limit;
    return {page, limit, skip};
}
export default pagination