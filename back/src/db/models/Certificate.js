import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async add(userId, agency, credit, grade, acquireDate) {
    const certificate = new CertificateModel({ userId, agency, credit, grade, acquireDate: new Date(acquireDate) });
    await certificate.save();
    return certificate;
  }

  static async findByUserId(userId) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }

  static async updateById(id, update) {
    const certificate = await CertificateModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return certificate;
  }

  static async deleteById(id) {
    const certificate = await CertificateModel.findByIdAndDelete(id);
    return certificate;
  }
}

export { Certificate };
