export default async (policyContext, config, { strapi }) => {
  const user = policyContext.state.user;
  if (!user) {
    return false; // Non authentifié
  }

  const { id: documentId } = policyContext.params;

  try {
    const articles = await strapi.entityService.findMany(
      "api::article.article",
      {
        filters: { documentId },
        populate: ["author"],
      }
    );

    const article = articles?.[0];

    if (!article) {
      return false; // Article introuvable
    }

    const isOwner = article.author?.id === user.id;
    const isAdmin = user.role?.name === "Administrator";

    return isOwner || isAdmin;
  } catch (error) {
    strapi.log.error("Policy is-owner-or-admin error:", error);
    return false;
  }
};
