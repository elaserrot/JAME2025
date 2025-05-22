const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasControllers');


router.get("/listarMascotas", mascotasController.listarMascota);

/**
 * @swagger
 * /mascotas/agregarMascota:
 *   post:
 *     summary: Agrega una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               edad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Mascota agregada exitosamente
 */


router.get("/cliente/:id", mascotasController.listarMascotaPorCliente);
router.post("/agregarMascota", mascotasController.agregarMascota);

/**
 * @swagger
 * /mascotas/eliminarMascota/{id}:
 *   delete:
 *     summary: Elimina una mascota por su ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 */
router.delete("/eliminarMascota/:id", mascotasController.eliminarMascota);

/**
 * @swagger
 * /mascotas/actualizarMascota/{id}:
 *   put:
 *     summary: Actualiza completamente una mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 */
router.put("/actualizarMascota/:id", mascotasController.actualizarMascota);

/**
 * @swagger
 * /mascotas/editarMascota/{id}:
 *   patch:
 *     summary: Edita parcialmente una mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mascota editada parcialmente
 */
router.patch("/editarMascota/:id", mascotasController.editarMascota);

module.exports = router;
